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
import Nav from "../../components/Header";
import SliderWithCards from "./Slider";


export default function Home() {
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);

    useEffect(() => {
      getProjects();
    }, []);

    async function getProjects() {
      try {
        const data = await axios.get("/project/all-projects");
        console.log(data);
        setProjects(data.data.projects);
      } catch (error) {
        
      }
    }

  return (
    <>
          <Nav />
                      {/* home */}
            <section id="homePage">
              <div id="heroSection">
                <h1 >
                Vote, Validate, and Venture Forward.
                <h3>

                Empower & Fund: Where the community validates, votes, and ensures every dollar is rightfully spent.           </h3>
                </h1>
              </div>
              <div id="sliderContainerHome">
                <SliderWithCards projects={projects}/>
              </div>
            </section>
      

    </>
  );
}