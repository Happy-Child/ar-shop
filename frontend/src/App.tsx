import React, { ReactNode, Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { routes, IRoute } from './routes';
import MPageLoading from './ui/molecules/MPageLoading';

const App: React.FC<ReactNode> = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {routes?.map((route: IRoute, index: number) => (
          <Suspense key={route.path || index} fallback={<MPageLoading />}>
            <Route path={route.path} exact={route.exact} component={route.component} />
          </Suspense>
        ))}
      </div>
    </BrowserRouter>
  );
};

export default App;
