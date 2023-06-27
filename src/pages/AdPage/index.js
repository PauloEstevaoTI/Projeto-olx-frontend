import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { PageArea, PageContainer } from "./styled";
import useApi from '../../helpers/OlxAPI'




const AdPage = () => {
    const api = useApi();  

    const { id } = useParams();

    // alert("ID : "+ id);

    return(
       <PageContainer>
        <PageArea>
            ...
        </PageArea>
       </PageContainer>
    )

}

export default AdPage;