import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardFooter, CardHeader, Form, Navbar } from 'react-bootstrap';

function Ecommerc() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products with all products
            })
            .catch(error => console.error('Error fetching products: ', error));
    }, []);

    const applyFiltersAndSort = () => {
        let filteredProducts = products.filter(product => {
            if (filters.length === 0 || filters.includes(product.category)) {
                return true;
            }
            return false;
        });

        if (sortOption === 'priceLowToHigh') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceHighToLow') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filteredProducts);
    };

    useEffect(() => {
        applyFiltersAndSort();
    }, [filters, sortOption, products]);

    const handleFilterChange = (category) => {
        if (filters.includes(category)) {
            setFilters(filters.filter(item => item !== category));
        } else {
            setFilters([...filters, category]);
        }
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    return (
        <div>
            {/* Sidebar/Navbar with filter and sort options */}
<Navbar bg='dark' style={{display:"flex", flexDirection:"row"}}>

   
<h2 style={{ color: 'white' }}>Filters</h2>
     <Navbar style={{ padding: '20px', borderRadius: '5px' }}>
      
      <Form>
        <Form.Check
          type="checkbox"
          label="Men"
          onChange={() => handleFilterChange('men')}
          style={{ color: 'white' }}
        />
        <Form.Check
          type="checkbox"
          label="Women"
          onChange={() => handleFilterChange('women')}
          style={{ color: 'white' }}
        />
        <Form.Check
          type="checkbox"
          label="Electronics"
          onChange={() => handleFilterChange('electronics')}
          style={{ color: 'white' }}
        />
      </Form>
    </Navbar>
    <Navbar>
      <h2>Sort Options</h2>
      <Form>
        <Form.Group controlId="sortOptions">
          <Form.Label>Select Sort Option</Form.Label>
          <Form.Select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">Select</option>
            <option value="priceLowToHigh">Price Low to High</option>
            <option value="priceHighToLow">Price High to Low</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Navbar>
    </Navbar>

            {/* Product listing with applied filters and sort option */}
            <div>
                <h2>Product Listing</h2>
                <div style={{display:'flex', flexDirection:"row", flexWrap:"wrap", justifyContent:"center",alignItems:"center"}}>
                    {filteredProducts.map(product => (
                        <Card key={product.id}>
                           <CardHeader> 
                          <h6 style={{width:"300px"}}> {product.title} </h6> 
                              </CardHeader>
                           <CardBody>
                           <img src={product.image}  alt={product.name} width='150' height='150'/> 
                           </CardBody>
                            <CardFooter> <h5> ${product.price} </h5></CardFooter> 
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ecommerc;
