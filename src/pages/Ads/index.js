import React, {useState, useEffect} from "react";
import { PageArea } from './styled'
import { PageContainer } from '../../components/MainComponents'
import useApi from '../../helpers/OlxAPI'
import { useLocation, useNavigate } from "react-router-dom";
import AdItem from "../../components/partials/AdItem";

let timer;


const Ads = () => {

    const api = useApi();
    const navigate = useNavigate();
    

    const useQueryString = () => {
        return new URLSearchParams ( useLocation().search)
    }

    const query = useQueryString();

    const [q, setQ] = useState( query.get('q') != null ? query.get('q') : '' )
    const [cats, setCat] = useState( query.get('cats') != null ? query.get('cats') : '' );
    const [state, setState] = useState( query.get('state') != null ? query.get('state') : '' );

    const [resultOpacity, setResultOpacity] = useState(1)

    const getAdsList = async () => {
        const json = await api.getAds({
            sort:'desc',
            limit: 9,
            q,
            cats,
            state
        });
       setAdList(json.ads)
       setResultOpacity(1)
    }

    useEffect(()=> {

        let queryString = []

        if(q){
            queryString.push(`q=${q}`);
        }
        
        if(cats){
            queryString.push(`cats=${cats}`);
        }
        
        if(state){
            queryString.push(`state=${state}`);
        }

        navigate(`?${queryString.join('&')}`);

        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(getAdsList, 2000)
        setResultOpacity(0.3)
       
    },[q, cats, state])


    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([])

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, [api])

    useEffect(() => {
        const getCategories = async() => {
            const scategories = await api.getCategories()
            setCategories(scategories)
        }

        getCategories();
    }, [api])

    useEffect(() => {
        getAdsList();
    }, [api])

    return(
       <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input 
                            type="text" 
                            name="q" 
                            placeholder="Oque você procura?" 
                            value={q}
                            onChange={e=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado: </div>
                        <select name="state" value={state} onChange={e=>setState(e.target.value)}>                            
                            {stateList.map((i, k)=>
                                <option key={k} value={i.name}>{i.name}</option>
                            )}                              
                        </select>            


                        <div className="filterName">Categoria: </div>
                        <ul>
                            {categories.map((i, k)=>
                                <li 
                                    key={k} 
                                    className={cats === i.slug ? 'categoryItem active' : 'categoryItem'}
                                    onClick={()=>setCat(i.slug)}
                                    >
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultado</h2>
                    <div className="list" style={{opacity: resultOpacity}}>
                        {adList.map((item, key) => 
                            <AdItem key={key} data={item}  />
                        )}
                    </div>
                   
                </div>
            </PageArea>
       </PageContainer>
      
    )
}

export default Ads;