import { useEffect, useState } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories/allCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxW="container.lg" mt={8}>
      <Heading as="h1" size="lg" mb={8}>
        All Categories
      </Heading>
      <VStack spacing={4} align="stretch">
        {categories.map((category) => (
          <Heading as="h2" size="md" key={category.id}>
            {category.name}
          </Heading>
        ))}
      </VStack>
    </Container>
  );
};

export default AllCategories;
