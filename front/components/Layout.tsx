import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

import styled from 'styled-components';
import UserMenu from './UserMenu';
import LoginMenu from './LoginMenu';

import { RootState } from '../interface/rootstate';

const Button = styled.button`
    display:block;
    height: 23px;
    width: 23px;
    border-radius: 50%;
    border: none;
    box-shadow: 2px 2px 7px #d3d3d3;
    font-size: 12px;
    background-color: white;
    text-align: center;
    padding-left: 6px;
    align-self: left;
`;

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const AppLayout: FC = ({ children }) => {
    const [width] = useWindowSize();
    const [menuOpen, setMenuOpen] = useState(false);
    const breakPoint = 900;

    const { me } = useSelector((state:RootState)=> state.user);
    const { mainPosts } = useSelector((state:RootState) => state.post);

    const algorithmPosts = mainPosts.filter((v:any) => v.category === 'algorithm');
    const javascriptPosts = mainPosts.filter((v:any) => v.category === 'javascript');
    const nodejsPosts = mainPosts.filter((v:any) => v.category === 'nodejs');
    const reactPosts = mainPosts.filter((v:any) => v.category === 'react');
    const interviewPosts = mainPosts.filter((v:any) => v.category === 'interview');

    const onMenuHandle = () => {
        setMenuOpen((prev) => !prev);
    } 
    
    if (width > breakPoint) {
        return (  
            <div style={{ maxWidth:'1100px', margin:'auto' }}>
                <Layout>
                    <AppBar position="static" style={{ backgroundColor: 'white'}} elevation={1}>
                        <Toolbar>
                            <Grid item xs={4}>
                                <Link href="/"><a><img src="/favicon.ico"></img></a></Link>
                            </Grid>
                            <Grid item xs={8} style={{ textAlign: 'right'}}>
                                <div>
                                    {me ? (
                                        <UserMenu />
                                    ) : (
                                        <LoginMenu />
                                    )}
                                </div>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Layout>
                        <Sider width={200} style={{ backgroundColor: 'white'}}>
                            <div>
                                <List component="nav" aria-label="main mailbox folders">
                                    {me && me.id === 1 && (
                                        <ListItem button>
                                            <Link href="/write"><ListItemText primary="글쓰기" /></Link>
                                        </ListItem>
                                    )}
                                    <ListItem button>
                                        <Link href="/">
                                        <ListItemText primary="Home" style={{ maxWidth:'50px'}} />
                                        </Link>
                                        {/* <Button>{mainPosts.length === 0? 0:mainPosts.length-1}</Button> */}
                                    </ListItem>
                                    <ListItem button>
                                        <Link href="/profile"><ListItemText primary="Profile"/></Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link href="/portfolio"><ListItemText primary="Portfolio"/></Link>
                                    </ListItem>
                                </List>
                                <Divider />
                                <List component="nav" aria-label="secondary mailbox folders">
                                    <ListItem button>
                                        <Link href="/category/javascript"><ListItemText primary="Javascript" style={{ maxWidth:'80px'}}/></Link>
                                        <Button>{javascriptPosts.length}</Button>
                                    </ListItem>
                                    <ListItem button>
                                        <Link href="/category/nodejs"><ListItemText primary="NodeJs" style={{ maxWidth:'60px'}}/></Link>
                                        <Button>{nodejsPosts.length}</Button>
                                    </ListItem>
                                    <ListItem button>
                                        <Link href="/category/react"><ListItemText primary="React" style={{ maxWidth:'50px'}}/></Link>
                                        <Button>{reactPosts.length}</Button>
                                    </ListItem>
                                    <ListItem button>
                                        <Link href="/category/algorithm">
                                            <ListItemText primary="Algorithm" style={{ maxWidth:'75px'}}/>
                                        </Link>
                                        <Button>{algorithmPosts.length}</Button>
                                    </ListItem>
                                    <ListItem button>
                                        <Link href="/category/interview">
                                            <ListItemText primary="면접준비" style={{ maxWidth:'75px'}}/>
                                        </Link>
                                        <Button>{interviewPosts.length}</Button>
                                    </ListItem>
                                </List>
                            </div>    
                        </Sider>
                        <Layout>
                            <Content style={{ minHeight: '600px'}}>
                                {children}
                            </Content> 
                        </Layout>                         
                    </Layout>
                </Layout>
            </div>
        )  
    }
    return (  
        <div style={{ maxWidth:'1100px', margin:'auto' }}>
            {menuOpen ? (
                <div className='back-dark'></div>
            ):null}
            <Layout>
                <AppBar position="static" style={{ backgroundColor: 'white', height: '55px'}} elevation={1}>
                    <Toolbar>
                        <Grid item xs={4}>
                            <a><img src="/hamburger.ico" onClick={onMenuHandle}></img></a>
                        </Grid>
                        <Grid item xs={8} style={{ textAlign: 'right'}}>
                            <div>
                                {me ? (
                                    <UserMenu />
                                ) : (
                                    <LoginMenu />
                                )}
                            </div>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Layout>
                    <div className={`sidebar-menu${menuOpen ? ' open' : ''}`} >
                        <List component="nav" aria-label="main mailbox folders">
                            {me && me.id === 1 && (
                                <ListItem button>
                                    <Link href="/write"><ListItemText primary="글쓰기" /></Link>
                                </ListItem>
                            )}
                            <ListItem button>
                                <Link href="/"><ListItemText primary="Home" style={{ maxWidth:'50px'}}/></Link>
                                {/* <Button>{mainPosts.length === 0? 0:mainPosts.length-1}</Button> */}
                            </ListItem>
                            <ListItem button>
                                <Link href="/profile"><ListItemText primary="Profile"/></Link>
                            </ListItem>
                            <ListItem button>
                                <Link href="/portfolio"><ListItemText primary="Portfolio"/></Link>
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem button>
                                <Link href="/category/javascript"><ListItemText primary="Javascript" style={{ maxWidth:'80px'}}/></Link>
                                <Button>{javascriptPosts.length}</Button>
                            </ListItem>
                            <ListItem button>
                                <Link href="/category/nodejs"><ListItemText primary="NodeJs" style={{ maxWidth:'60px'}}/></Link>
                                <Button>{nodejsPosts.length}</Button>
                            </ListItem>
                            <ListItem button>
                                <Link href="/category/react"><ListItemText primary="React" style={{ maxWidth:'50px'}}/></Link>
                                <Button>{reactPosts.length}</Button>
                            </ListItem>
                            <ListItem button>
                                <Link href="/category/algorithm">
                                    <ListItemText primary="Algorithm" style={{ maxWidth:'75px'}}/>
                                </Link>
                                <Button>{algorithmPosts.length}</Button>
                            </ListItem>
                            <ListItem button>
                                <Link href="/category/interview">
                                    <ListItemText primary="면접준비" style={{ maxWidth:'75px'}}/>
                                </Link>
                                <Button>{interviewPosts.length}</Button>
                            </ListItem>
                        </List>
                    </div>    
                    <Layout>
                        <Content style={{ minHeight:'600px'}}>
                            {children}
                        </Content> 
                    </Layout>                         
                </Layout>
            </Layout>
        </div>
    )  
}


export default AppLayout