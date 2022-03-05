import React from 'react'
import './styles/Home.css'

function Home() {

    return (

        <div>

            <div className='home'>
                
                <h1>SmartSwitch</h1>
                <p>Some epic device thing that you can use to control the lights and electronics and stuff with an app or website or something idk</p>


                

            </div>

        </div>

    )

}

function About() {


    return (

        <div className='about'>

            <h1>About</h1>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis suscipit maiores fugiat iste eum, unde repellat, cum explicabo reprehenderit placeat, odio corporis sint blanditiis quae adipisci! Velit, excepturi similique. Quam quisquam cumque ab a ratione atque eum debitis doloribus impedit?
            </p>

            <h2>Socials or smtin</h2>

            <div className='socials'>

                <div className="social">
                    <i className='fab fa-instagram'></i>
                    <p>Instagram</p>
                </div>

                <div className="social">
                    <i className='fab fa-twitter'></i>
                    <p>Twitter</p>
                </div>

                <div className="social">
                    <i className='fab fa-github'></i>
                    <p>Github</p>
                </div>
            </div>

        </div>

    )
}

export {
    Home,
    About
}