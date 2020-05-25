import React, { Component } from "react";
import TicketCard from "./TicketCard";

export default class TicketsContainer extends Component {
  render() {
    return (
      <section className="uk-section">

        <div uk-filter="target: .js-filter">
          {/* Filter Controls */}
          <ul className="uk-subnav uk-subnav-pill">
            <li className="uk-active" uk-filter-control="">
              <a href="#">Todos</a>
            </li>
            <li uk-filter-control="[status='Open']">
              <a href="#">Abiertos</a>
            </li>
            <li uk-filter-control="[status='ClosingRequested']">
              <a href="#">Validar</a>
            </li>
            <li uk-filter-control="[status='Closed']">
              <a href="#">Cerrados</a>
            </li>
          </ul>
          {/* Layout items */}
          <div
            className="js-filter uk-grid uk-text-center uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m"
            uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 100; repeat: false"
          >
            {this.props.tickets.map((ticket) => (
              <div
                status={ticket.status}
                className="uk-card uk-card-default uk-margin-bottom"
              >
                <TicketCard
                  key={ticket.id}
                  status={ticket.status}
                  tenantCode={ticket.tenantCode}
                  tecnicianName={ticket.tecnicianName}
                  user={ticket.clientUserFullName}
                  reportDate={ticket.reportDate}
                  description={ticket.issueDescription}
                  activities={ticket.activities}
                  internalNotes={ticket.internalNotes}
                  closedDate={ticket.closedDate}
                  clientComments={ticket.clientComments}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
