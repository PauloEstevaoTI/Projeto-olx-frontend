import React, {useState} from "react";
import { PageArea, SearchArea } from './styled'
import { PageContainer } from '../../components/MainComponents'
import useApi from '../../helpers/OlxAPI'

const Home = () => {

    const api = useApi();

    return(
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="Oque você procura?" />
                            <select name="state" >

                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="cetegoryList">

                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    ...
                </PageArea>
            </PageContainer>
        </>
      
    )
}

export default Home;