import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Button, ActivityIndicator } from "react-native";
import axios from "axios";

type Quote = {
  name: string;
  detail: string;
};

export default function Index() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (query: string = "") => {
    setLoading(true);

    try {
      const baseURL = "https://course-vis.onrender.com/api/data/";
      const url = query ? `${baseURL}?search=${encodeURIComponent(query)}` : baseURL;

      const response = await axios.get(url);
      const data = response.data;

      setQuotes(data.results || data); // support paginated or full results
    } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.message);
  } else if (error instanceof Error) {
    console.error("Unknown error:", error.message);
  } else {
    console.error("An unexpected error occurred", error);
  }
} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // fetch initial data
  }, []);

  const handleSearch = () => {
    fetchData(searchTerm.trim());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Course Schedule</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search course name or professor..."
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.count}>Total Courses: {quotes.length}</Text>
      )}

      {quotes.map((q, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.detail}>{q.detail}</Text>
          <Text style={styles.name}>— {q.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  count: {
    marginBottom: 15,
    color: "gray",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  detail: {
    fontSize: 16,
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    color: "gray",
  },
});
