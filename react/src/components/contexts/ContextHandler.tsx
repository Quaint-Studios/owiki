import { IRoute } from 'components/routes/Routes';

export default function ContextHandler({ /*route,*/ children }: IContextHandler) {
  // Do stuff with route

  return children;
}

interface IContextHandler {
  route: IRoute;
  children: any;
}
