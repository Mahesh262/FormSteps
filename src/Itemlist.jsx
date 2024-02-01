import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Itemlist() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Make a request to JSON placeholder or any other open API
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div>
            <h2 style={{backgroundColor:"wheat"}}>Items List</h2>
            <div style={{display:'flex', flexDirection:"column"}}>
                {items.map(item => (
                    <h5 style={{color:"teal"}} key={item.id}>{item.title}</h5>
                ))}
            </div>
        </div>
    );
}

export default Itemlist;
