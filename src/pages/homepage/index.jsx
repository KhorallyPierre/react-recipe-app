import Search from "../../components/search";


const dummydata = "dummydata"

const Homepage = ()=> {

    const getDataFromSearchComponent = (getData) => {
        console.log(getData, 'getData')
    }
    return (
        <div className="homepage">
            <Search getDataFromSearchComponent = {getDataFromSearchComponent} dummydatacopy = {dummydata}/>
        </div>
    )
}

export default Homepage;