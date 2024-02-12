import styles from "../style"

const Home = () => {
  return (
    <section id='home' className='md:flex-row flex-col py-6 ml-3 h-screen'>
      <div>
        <h1 className={`${styles.heading1}`}>Book Heaven</h1>

        <div className={`${styles.flexCenter} flex flex-col`}>
          <h2 className={`${styles.subheading} max-w-[470px] md:pt-10 pt-5`}>
            Welcome to Book Heaven
          </h2>
          <p className={`${styles.paragraph} max-w-[80%] md:mt-10 pt-5 text-center`}>
            your literary sanctuary! Explore a curated collection of books, manage your library
            effortlessly, and discover new reads tailored to your taste. Join our community of book
            enthusiasts and dive into a world where every page brings new stories to life. Happy
            reading!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Home
