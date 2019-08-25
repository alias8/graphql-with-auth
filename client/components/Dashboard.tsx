import React from "react";

interface IProps {
  something: string;
}

class Dashboard extends React.Component<IProps> {
  public render() {
    return <div>This is the dashboard, you are now logged in</div>;
  }
}

export default Dashboard;
