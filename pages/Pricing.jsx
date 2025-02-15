import Navbar from "./Navbar"

function Pricing() {
    return (
        <div className="bg-[#333333] w-screen h-[calc(100vh)] box-border overflow-hidden">
          <Navbar position="relative" />
          <div className="flex flex-col gap-[3rem] md:flex-row justify-center items-center h-[100%] w-[80%] m-auto text-white text-bold text-center">
          <img src="../pricing.jpg" alt="Pricing Image" className="w-[45%] rounded-sm" />
          <div className="w-[55%]">
            <h1 className="text-2xl">About Pricing</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste distinctio facilis deleniti adipisci, perspiciatis eum fuga odio perferendis quod rem?</p>
          </div>
          </div>
        </div>
    )
}

export default Pricing
