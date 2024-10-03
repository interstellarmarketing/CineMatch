const Nav = () => {
  return (
    <div className="flex justify-between items-center gap-10">
        <div className="cursor-pointer ">
            Home
        </div>
        <div className="cursor-pointer">
            Categories
        </div>

        <div className="cursor-pointer">
            TV Shows
        </div>

        <div className="cursor-pointer">
            Anime
        </div>

        <div className="cursor-pointer">
            About
        </div>
    </div>
  )
}

export default Nav;