import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const POSTSQUERY = `
query Posts {
    posts {
        edges {
            node {
                id
                slug
                uri
                title(format: RENDERED)
                excerpt(format: RENDERED)
                content(format: RENDERED)
                video
                categories {
                    edges {
                        node {
                            id
                            name
                            slug
                            uri
                        }
                    }
                }
                tags {
                    edges {
                        node {
                            id
                            name
                            slug
                        }
                    }
                }
                author {
                    node {
                        id
                        name
                        uri
                        slug
                    }
                }
                date
                featuredImage {
                    node {
                        id
                        sourceUrl
                    }
                }
            }
        }
    }
  }
`

function App() {
  const [data, setData, loading, error] = useState({ posts: [] });
  const fetchData = async () => {
    const queryResult = await axios.post('https://blog.devsgraphics.co.ke/graphql/', {
      query: POSTSQUERY,
    });
    const result = queryResult.data.data;
    setData({ posts: result.posts.edges });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>;

  console.log(data);
  return (
    <>
    {data.posts.map((post) => (
    <div key={post.node.id} className="App">
      <header className="App-header">
      <img
              src={post?.node?.featuredImage?.node?.sourceUrl}
              alt={post.node.title}
              className="object-cover h-full w-full group-hover:scale-110 transition-all duration-500"
            />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
        ))}
        </>
  );
}

export default App;
