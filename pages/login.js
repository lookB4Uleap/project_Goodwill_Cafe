import React from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth } from '../util/firebase';
import Navbar from '../components/Navbar';
import GlassContainer from '../components/GlassContainer';

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
};

const login = () => {
    return (
        <>
            
            <div className='Empty-Space'></div>
            <GlassContainer>
            <Navbar opt={2} />
            <div className="Main">
            <div className="Logo">Goodwill Cafe</div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} className="Menu-Article" />
            </div>
            </GlassContainer>
        </>
    )
}

export default login
