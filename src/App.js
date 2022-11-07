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
`;

function App() {
  const [data, setData, loading, error] = useState({ posts: [] });
  const fetchData = async () => {
    const queryResult = await axios.post(
      'https://blog.devsgraphics.co.ke/graphql/',
      {
        query: POSTSQUERY,
      }
    );
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
        <div
          key={post.node.id}
          style={{ alignItems: 'center', display: 'flex', margin: '100px' }}
          className="post md:flex items-center group"
        >
          <div
            style={{
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              height: '200px',
            }}
            className="post-image overflow-hidden rounded-[10px] xl:w-[530px] md:w-[400px] h-[200px] md:h-[265px] flex-shrink-0 relative"
          >
            <>
              <img
                src={post?.node?.featuredImage?.node?.sourceUrl}
                alt={post.node.title}
                style={{
                  objectFit: 'cover',
                  transitionProperty: 'all',
                  transitionDuration: '500ms',
                  width: '100%',
                  height: '100%',
                }}
              />
            </>
            {/* <div v-if="post.node.video" className="icon w-15 h-15 bg-primary border-2 border-white text-white text-xl absolute top-4 right-4 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30" fill="currentColor"><g><path d="M42,21a4,4,0,0,0-2.34.75L35,25.06V24a5,5,0,0,0-5-5h-.23a8,8,0,1,0-10.54,0H14.46a6,6,0,1,0-8.75.19A5,5,0,0,0,2,24V38a5,5,0,0,0,5,5H30a5,5,0,0,0,5-5V36.94l4.63,3.31A4,4,0,0,0,46,37V25A4,4,0,0,0,42,21ZM18.5,13a6,6,0,1,1,6,6A6,6,0,0,1,18.5,13ZM10,11a4,4,0,1,1-4,4A4,4,0,0,1,10,11ZM33,38a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V24a3,3,0,0,1,3-3H30a3,3,0,0,1,3,3V38Zm11-1a2,2,0,0,1-3.21,1.65L35,34.49v-7l5.79-4.13A2,2,0,0,1,44,25Z"/></g></svg>
                </div> */}
          </div>
          <div
            style={{ paddingLeft: ' 1.75rem', marginTop: '0' }}
            className="post-info md:pl-7 md:mt-0 mt-10"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                font: '13px',
                fontSize: '1rem',
                lineHeight: '1.5rem',
              }}
              className="flex items-center text-[13px] md:text-base"
            >
              <a
                style={{
                  paddingTop: '0.375rem',
                  paddingBottom: '0.375rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  marginRight: '0.5rem',
                  textTransform: 'capitalize',
                  borderRadius: '0.375rem',
                  background: '#edebf5',
                }}
                className="category bg-[#edebf5] capitalize rounded-md px-4 py-1.5 mr-2 hover:bg-primary hover:text-white"
                href="/"
              >
                {post?.node?.categories?.node?.name}
              </a>
              <div
              style={{marginLeft: '1.5rem' }}
               className="author ml-4 md:ml-6">
                <span
                style={{paddingRight: '0.5rem',
                  color: '#9b9ea1'
                  }}
              >By</span>
                <span />
                <a className="hover:text-primary" href="/">
                  {post.node.author.node.name}
                </a>
              </div>
            </div>
            <h2
            style={{paddingTop: '1rem',
              marginBottom: '0',
              fontSize: '1.125rem',
              lineHeight: '1.75rem',
              fontWeight: '700',}}
            className="text-lg md:text-2xl font-bold pt-4 md:pt-6 mb-0 hover:text-primary">
              <div>{post.node.title}</div>
            </h2>
            <client-only>
              <p style={{marginTop: '1rem'}} className="mt-4">{post.node.excerpt}</p>
            </client-only>
            <div className="meta flex items-center mt-4 md:mt-5">
              <div className="flex items-center">
                <i className="icofont-ui-calendar"></i>
                <p className="pl-2">{post.node.date}</p>
              </div>
              <div className="flex items-center pl-5">
                <i className="icofont-clock-time"></i>
                <p className="pl-2">{post.node.content} min read</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
