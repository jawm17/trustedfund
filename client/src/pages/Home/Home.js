import React, { useEffect, useState } from "react";
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import {
  Icon,
  Image,
  Header,
  Menu,
  Segment,
  Sidebar, Card, Button
} from 'semantic-ui-react'
import axios from "axios";
import "./homeStyle.css";

// comps
import Nav from "../../components/Nav";
import SliderWithCards from "./Slider";


export default function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <nav id="nav" >
        <Menu fixed='top'  id="navCon" >
            <Header as='h2'>
              <Icon name='money bill alternate outline' inverted />
              <Header.Content href="/" as='a' style={{ color: "white" }}>Fund Trust</Header.Content>
            </Header>
            <Button size="mini"><Icon name="upload" />Create</Button>
          <Menu.Menu  position='right'  >
            <Menu.Item id="burger"  onClick={() => setVisible(!visible)}>
              <Icon inverted name='list layout circle' size='large' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
          >
            <Menu.Item as='a' href="/projects" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
              Projects
              <Icon name='barcode' />
            </Menu.Item>
            <Menu.Item as='a' href="/" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
              Profile
              <Icon name='chevron down' />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            {/* home */}
            <section id="homePage">
              <div id="heroSection">
                <h1 style={{}}>
                Vote, Validate, and Venture Forward.
                <h3>

                Empower & Fund: Where the community validates, votes, and ensures every dollar is rightfully spent.           </h3>
                </h1>
              </div>
              <div id="sliderContainerHome">
                <SliderWithCards />
              </div>
            </section>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </nav>

    </>
  );
}