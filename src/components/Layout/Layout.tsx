import React, { ReactNode } from 'react';
import { Footer } from '../Footer';
import { Navbar } from '../Navbar';
import { OffCanvasMenu } from '../OffCanvasMenu';
export interface LayoutProps {
	children: ReactNode;
}

const Layout : React.FC<LayoutProps> = (props) => {
	return (
		<>
			<OffCanvasMenu />
			<Navbar />
			{props.children}
			<Footer />
		</>
	);
};

export default Layout;
