import React from 'react';

import classes from './footer.module.css';

import gmailIcon from '../../assets/gmail.png';
import linkedinIcon from '../../assets/linkedin.png';
import githubIcon from '../../assets/github.png';
import twitterIcon from '../../assets/twitter.png';

const Footer = () => {

    return (
        <div className={classes.footer}>
            <div className={classes.message}>
                <h2>This website is a part of Devesh Gupta's portfolio.</h2>
                <p>Not meant for commercial use.</p>
            </div>
            <div className={classes.icons}>
                <a 
                    href="mailto:devesh.gupta.198@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    title="send a mail to Devesh Gupta"
                >
                    <img src={gmailIcon} alt=''></img>
                </a>
                <a 
                    href="https://www.linkedin.com/in/devesh-gupta-1908/"
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn"
                >
                    <img src={linkedinIcon} alt=""></img>
                </a>
                <a 
                    href="https://github.com/devesh-198"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub"
                >
                    <img src={githubIcon} alt=""></img>
                </a>
                <a 
                    href="https://twitter.com/Devesh_Gupta_19"
                    target="_blank"
                    rel="noreferrer"
                    title="Twitter"
                >
                    <img src={twitterIcon} alt=""></img>
                </a>
            </div>
            <div>
                <p>Thanks for visiting, have a good day.</p>
                <p>Handcrafted by Devesh Gupta</p>
            </div>
        </div>
    )
} 

export default Footer;