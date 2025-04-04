import React from 'react';
import PartyAdminList from '../components/Admin/PartyAdminList';

const AdminDashboardPage = () => {
    return (
        <div className= "adminConatiner">
            <h1 style={{ textAlign: 'center', paddingTop:"10px" }}>Admin Dashboard</h1>
            <PartyAdminList />
        </div>
    );
};

export default AdminDashboardPage;
