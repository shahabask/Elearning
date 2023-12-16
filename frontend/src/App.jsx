import  {ToastContainer} from 'react-toastify';
// import { Container } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Layout from './layout/layout';
import 'react-toastify/dist/ReactToastify.css'

import { ErrorBoundary } from 'react-error-boundary';

const initialOptions = {
  clientId: 'AbDu3j7FOwj2ZSeEXxlQnBlIqh5gJbaWwe3LJWSgoK157FYjWAbkQpgw8nN4VcllfHi9TpftGk66z0sz',
  currency: 'USD',
  intent: 'capture',
};

// const Layout = () => {
//   // ... Your Layout component content
// };

const AppErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <h1>Something went wrong!</h1>
    <p>{error?.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

function App() {
  return (
    <>
      <ToastContainer />
      <ErrorBoundary FallbackComponent={AppErrorFallback} onReset={() => window.location.reload()}>
        <PayPalScriptProvider options={initialOptions}>
          <Layout style={{ backgroundColor: '#FDF8EE' }} />
        </PayPalScriptProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
