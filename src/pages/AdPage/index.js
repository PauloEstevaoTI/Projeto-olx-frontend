import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { PageArea, Fake, OthersArea, Breadchumb} from "./styled";
import useApi from '../../helpers/OlxAPI'
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";
import { Link } from "react-router-dom";


const AdPage = () => {
    const api = useApi();  

    const { id } = useParams();


    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState([]);

    useEffect(() => {
        const getAdInfo = async(id)=> {
            const json = await api.getAd(id, true);
            setAdInfo(json  );
            setLoading(false)
        }
        getAdInfo(id)
        console.log(adInfo)
    },[])

    
    const formatDate = (date) => {
        let cDate = new Date(date);

        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`
    }

    let othersAds;

    if(adInfo.others){

        othersAds = adInfo.others.slice(0, 4);
        console.log(othersAds);
        console.log(adInfo.others)
    }
   

    return(
       <PageContainer>
        { adInfo.category && 
            
            <Breadchumb>
                Você está aqui:
                <Link to="/">Home</Link>
                /
                <Link to={`/ad?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                /
                <Link to={`/ad?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                / {adInfo.title}
            </Breadchumb>
        }
        {console.log(adInfo)}
        <PageArea>
            <div className="leftSide">
                <div className="box">
                    <div className="adImage">
                    {  loading && <Fake height={300} />   }
                    { adInfo.images &&
                        <Slide>
                            {adInfo.images.map((img, k) =>
                                <div key={k} className="each-slide">
                                    <img src={img} alt="" />
                                </div>
                            )}                                
                        </Slide>
                        
                    }
                       
                    </div>
                    <div className="adInfo">
                        <div className="adName">
                            {  loading && <Fake height={20} />   }
                            { adInfo.title && 
                                <h2>{adInfo.title}</h2>
                            }
                            {
                                adInfo.dateCreated && 
                                <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                            }
                            
                        </div>
                        <div className="adDescription">
                            {  loading && <Fake height={100} />   }
                            { adInfo.description &&
                                <p>{adInfo.description}</p>
                            }
                            <hr />
                            {adInfo.views &&
                                <small>Visualizações: {adInfo.views}</small>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="box box-padding">
                    {  loading && <Fake height={20} />   }
                    {  adInfo.priceNegotiable && "Preço negociável" }
                    {  !adInfo.priceNegotiable && adInfo.price &&
                        <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                    }
                </div>
                {  loading && <Fake height={50} />   }
                { adInfo.userInfo && 
                    <>  
                        <a href={`mailto:${adInfo.userInfo.email}`} className="contactSellerLink" target="blank">Fale com o vendedor</a>
                        <div className="createdBy box box-padding">
                            <strong>{adInfo.userInfo.name}</strong>
                            <small>Email: {adInfo.userInfo.email}</small>
                            <small>Estado: {adInfo.stateName}</small>
                        </div>
                    </>
                }              
            </div>
           
        </PageArea>
        <OthersArea>
            { adInfo.others &&
                    <>
                        <h2>Outras ofertas</h2>
                        <div className="list">
                            {othersAds.map((item, key)=>
                                <AdItem key={key} data={item} />
                            )}
                        </div>
                    </>

                }
        </OthersArea>      

       </PageContainer>
    )

}

export default AdPage;