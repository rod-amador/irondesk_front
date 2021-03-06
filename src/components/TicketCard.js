import React, { Component } from "react";
import AppContext from "../AppContext";
import Timer from "./Timer";
import ModalButtonActivity from "./Modals_Forms/ModalButtonActivity";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default class TicketCard extends Component {
  static contextType = AppContext;

  assignVisible = () => {
    return (
      this.props.status !== "Closed" &&
      ["Admin", "Tecnician"].includes(this.context.currentUser.role) &&
      !this.props.tecnicianName
    );
  };

  validateVisible = () => {
    return (
      ["Admin", "Tecnician"].includes(this.context.currentUser.role) &&
      this.props.tecnicianName &&
      this.props.status === "Open"
    );
  };

  closeVisible = () => {
    return (
      ["Admin", "User"].includes(this.context.currentUser.role) &&
      this.props.status === "ClosingRequested"
    );
  };

  render() {
    const { assignTecnician, updateTicketStatus } = this.context;
    const assignVisible = this.assignVisible();
    const validateVisible = this.validateVisible();
    const closeVisible = this.closeVisible();
    return (
      <section className="
      uk-card 
      uk-card-default 
      uk-flex
      uk-flex-around
      uk-margin-top">
      <div className="uk-card-body ">
        {/* Encabezado con badges e íconos */}

        <section className="uk-grid uk-flex-around ">
          <article>
            <div
              className={
                this.props.status === "Open"
                  ? "uk-label-danger"
                  : this.props.status === "ClosingRequested"
                  ? "uk-label-warning"
                  : "uk-label-success"
              }
            >
              {this.props.status === "Open"
                ? "Abierto"
                : this.props.status === "ClosingRequested"
                ? "Validar"
                : "Cerrado"}
            </div>
          </article>

          <article>
            <ul className="uk-iconnav">
              <li>
                {" "}
                <button href="#" uk-icon="icon: file-edit"></button>{" "}
              </li>
              <li>
                {" "}
                <button href="#" uk-icon="icon: trash"></button>{" "}
              </li>
            </ul>
          </article>

          <article>
            <div className="uk-label">{this.props.tenantCode}</div>
          </article>
        </section>

        {/* Timer actualizado en tiempo real */}
        {this.props.status === "Closed" ? null : (
          <Timer reportDate={this.props.reportDate} />
        )}
        {/* Labels Asignado a .... X */}

        <section
          className="uk-flex uk-flex-center uk-flex-column uk-child-width-1-1"
          style={{ alignItems: "start", justifyContent: "flex-end" }}
        >
          <article style={{ display: "flex", textAlign: "initial" }}>
            <div className="uk-width-expand" uk-leader="">
              <span uk-icon="users"></span>
              <span className="uk-margin">Asignado a</span>
            </div>
            <div className="uk-margin-small-left">
              {this.props.tecnicianName}
            </div>{" "}
            <hr />
          </article>

          {/* Descripción colapsable */}
          <article className="container-fluid" style={{ textAlign: "initial" }}>
            <ul uk-accordion="multiple: true">
              <li className="uk-closed">
                <button className="uk-accordion-title uk-button uk-button-muted uk-width-1-1">
                  Descripción
                </button>

                <div className="uk-accordion-content">
                  <article className="uk-comment uk-comment-primary uk-margin">
                    <header className="uk-comment-header uk-grid-medium uk-flex-middle">
                      <div className="uk-width-expand">
                        <h6 className="uk-comment-title uk-margin-remove">
                          <span uk-icon="user"></span>{" "}
                          <span>{this.props.user}</span>
                        </h6>

                        <span>
                          {" "}
                          {dayjs(this.props.reportDate).format(
                            "D/MM/YYYY h:mm a"
                          )}{" "}
                        </span>
                      </div>
                    </header>

                    <div className="uk-comment-body uk-text-justify">
                      {" "}
                      <p>{this.props.description}</p>{" "}
                    </div>
                  </article>
                </div>
              </li>
            </ul>
          </article>

          {/* Actividades colapsables */}
          <section className="container-fluid" style={{ textAlign: "initial" }}>
            <ul uk-accordion="multiple: true">
              <li className="uk-closed">
                <button className="uk-accordion-title uk-button uk-button-muted uk-width-1-1">
                  Actividades
                </button>

                <div className="uk-accordion-content">
                  <article className="uk-overflow-auto uk-height-small uk-width-max uk-width-auto">
                    <table className="uk-table uk-table-striped">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Actividades</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.props.activities.map((activity) => (
                          <tr key={activity._id}>
                            <td>{dayjs(activity.date).format("D/MM H:mm")}</td>
                            <td>{activity.activity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </article>
                  {this.props.status === "Closed" ? null : (
                    <article>
                      <ul className="uk-iconnav uk-align-right">
                        <li className="uk-margin-small-top">
                          <ModalButtonActivity ticketId={this.props.ticketId} />
                        </li>
                      </ul>
                    </article>
                  )}
                </div>
              </li>
            </ul>
          </section>
          {/* Botones Cerrar / Validar */}
          <div className="uk-grid uk-flex-around">
            {!assignVisible ? null : (
              <div className="uk-align-center">
                <button
                  className="uk-button uk-button-default"
                  onClick={() => assignTecnician(this.props.ticketId)}
                >
                  ATENDER
                </button>
              </div>
            )}
            {!validateVisible ? null : (
              <div>
                <button
                  className="uk-button uk-button-default"
                  onClick={() =>
                    updateTicketStatus(this.props.ticketId, {
                      status: "ClosingRequested",
                    })
                  }
                >
                  Validar
                </button>
              </div>
            )}
            {!closeVisible ? null : (
              <div>
                <button
                  className="uk-button uk-button-default"
                  onClick={() =>
                    updateTicketStatus(this.props.ticketId, {
                      status: "Closed",
                    })
                  }
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
      </section>
    );
  }
}
