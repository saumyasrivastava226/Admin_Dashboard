import logo from './logo.svg';
import './App.css';
import { AppHeader } from './Components/AppHeader';
import { SideMenu } from './Components/SideMenu';
import { PageContent } from './Components/PageContent';
import { AppFooter } from './Components/AppFooter';
import { Space } from 'antd';


function App() {
  return (
    <div className="App">
      <AppHeader/>
      <Space className="SideMenuAndPageContent">
        <SideMenu/>
        <PageContent/>
      </Space>
      <AppFooter/>
    </div>
  );
}

export default App;
