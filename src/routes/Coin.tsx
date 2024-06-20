import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";
import { IoChevronBack } from "react-icons/io5";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
    queryKey: ["ticker", coinId],
    queryFn: () => fetchCoinTickers(coinId),
    staleTime: 5 * 1000,
  });
  const handleGoBack = () => {
    navigate("/");
  };
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackButton onClick={handleGoBack}>
          <IoChevronBack />
        </BackButton>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab
              to={`/${coinId}/chart`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Chart
            </Tab>
            <Tab
              to={`/${coinId}/price`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Price
            </Tab>
          </Tabs>
        </>
      )}
      <Outlet context={{ coinId }} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 10px;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  font-size: 2rem;
  color: ${(props) => props.theme.textColor};
  transform: translateY(-40%);
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
  cursor: pointer;
  svg {
    vertical-align: text-bottom;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  span:first-child {
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled(NavLink)`
  padding: 7px 0px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  text-transform: uppercase;
  transform: rotateX(0deg);
  &.active {
    color: ${(props) => props.theme.accentColor};
    transform: rotateX(360deg);
    transition: all 0.5s;
  }
  a {
    display: block;
  }
`;

const Loader = styled.p`
  text-align: center;
`;

export default Coin;
