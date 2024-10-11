"use client";
import '@styles/global.css';
import Feed from '@components/Feed';
import AboutQ from '@components/AboutQ';
import Typewriter from 'typewriter-effect'


const Home = () => {


    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-green-600">
             
             
            <Typewriter
  onInit={(typewriter) => {
    typewriter.typeString('   Quotes That Echo ,')
    
      .callFunction(() => {
        console.log('String typed out!');
      })
      .pauseFor(2500)
    //   .deleteAll()
      .callFunction(() => {
        console.log('All strings were deleted');
      })
      .start();
  }}
/>
                <span className="orange_gradient">
                  voices That Remain Unseen
                </span>
            </h1>
            <p className="desc text-center">
                Quotely allows users to anonymously share quotes, thoughts, or ideas with a community that values words over identity
            </p>

            <br />
        

            {/* feed component */}
            <Feed />
            {/* <Link
                  href="/create-prompt"
                  className="black_btn m-3"
                  onClick={() => setToggleDropdown(false)}
                >
                  Upload Your Thoughts
                </Link> */}
            <br/>
            <br/>
            <br/>
            <br/>
            <AboutQ/>
            

        </section>
    );
};

export default Home;
