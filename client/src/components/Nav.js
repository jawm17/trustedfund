import React, {useState} from "react";
import "./styles/nav.css";

import {
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'
export default function Nav() {
    const [visible, setVisible] = useState(false);

    return (
        <div id="navBar">

    <div id="navLinks">
    <div id="navBtn">
          <Image
            src='https://via.placeholder.com/150' // Replace with your profile picture URL
            size='tiny'
            circular
            onClick={() => setVisible(!visible)}
            style={{ cursor: 'pointer' }} // Makes the image act like a clickable button
          />
    </div>
          <Sidebar.Pushable as={Segment} >
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width='thin'
              direction= "right"
            >
              <Menu.Item as='a'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
            </Sidebar>
    
            <Sidebar.Pusher dimmed={visible}>
    
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          </div>
        </div>
      );
}
