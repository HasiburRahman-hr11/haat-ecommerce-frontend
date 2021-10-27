import './AuthForm.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Container from '@mui/material/Container';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';


const AuthForm = () => {


    return (
        <div className="main">
            <div className="login_page py-4">
                <Container fixed>
                    <div className="login_page_content">
                        <Tabs className="login_tabs">
                            <TabList className="d-flex align-items-center login_tab_list mb-1">
                                <Tab className="login_tabs_item">Sign In</Tab>
                                <Tab className="login_tabs_item">Sign Up</Tab>
                            </TabList>
                            <TabPanel className="login_panel">

                                <SignIn />

                            </TabPanel>
                            <TabPanel className="register_panel">

                                <SignUp />

                            </TabPanel>
                        </Tabs>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default AuthForm;