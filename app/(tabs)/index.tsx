import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";

type Quote = {
  name: string;
  detail: string;
};

export default function Index() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = (query: string = "") => {
    setLoading(true);

    const url = query
      ? `http://100.83.52.158:8000/wel/?search=${encodeURIComponent(query)}`
      : "http://100.83.52.158:8000/wel/";

    axios
      .get(url)
      .then((res) => {
        console.log("Fetched data:", res.data);
        setQuotes(res.data.results || res.data); // fallback for non-paginated
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData(searchTerm);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Course Schedule</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search course name..."
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <Text style={styles.count}>
        {loading ? "Loading..." : `Total Courses: ${quotes.length}`}
      </Text>

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
});
