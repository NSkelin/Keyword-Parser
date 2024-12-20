import {CyHttpMessages} from "node_modules/cypress/types/net-stubbing";
import {KeywordEditor} from "./KeywordEditor";

describe("'Create' mode", () => {
  beforeEach(() => {
    cy.mount(
      <KeywordEditor
        id={1}
        collection="collection"
        mode="Create"
        onSubmit={cy.spy().as("onSubmit")}
        onCreate={cy.spy().as("onCreate")}
        onUpdate={cy.spy().as("onUpdate")}
        onDelete={cy.spy().as("onDelete")}
      />,
    );

    cy.get("[data-cy='inputComp']").eq(0).as("displayName");
    cy.get("[data-cy='inputComp']").eq(1).as("aliases");
  });

  it("renders", () => {
    cy.mount(
      <KeywordEditor
        id={1}
        collection="collection"
        onSubmit={cy.spy().as("onSubmit")}
        onCreate={cy.spy().as("onCreate")}
        onUpdate={cy.spy().as("onUpdate")}
        onDelete={cy.spy().as("onDelete")}
      />,
    );
  });

  it("should call onSubmit if the api call succeeds on create", () => {
    cy.intercept("POST", "http://localhost:8080/api/collection", {body: {id: 11}});

    cy.get("@displayName").find("[data-cy='input']").type("test");
    cy.get("@aliases").find("[data-cy='input']").type("alias1,");

    cy.get("[data-cy='submit']").click();
    cy.wait(1000);

    cy.get("@onSubmit").should("be.called");
  });

  it("should not call onSubmit if the api call fails on create", () => {
    cy.get("@displayName").find("[data-cy='input']").type("test");
    cy.get("@aliases").find("[data-cy='input']").type("alias1,");

    cy.get("[data-cy='submit']").click();
    cy.wait(1000);

    cy.get("@onSubmit").should("not.be.called");
  });

  describe("Test form validation", () => {
    it("should submit when inputs are correct", () => {
      // setup mock api responses for keyword form
      cy.intercept(
        "POST",
        "http://localhost:8080/api/collection*",
        cy
          .spy((req: CyHttpMessages.IncomingHttpRequest) => {
            req.reply({body: {id: 11}});
          })
          .as("post"),
      );

      cy.get("@displayName").find("[data-cy='input']").type("test");
      cy.get("@aliases").find("[data-cy='input']").type("alias1,");

      // confirm that submit did run
      cy.get("[data-cy='submit']").click();
      cy.wait(1000);
      // should not call api
      cy.get("@post").should("have.been.called");
      // should not update state
      cy.get("@onSubmit").should("have.been.calledOnce");
      cy.get("@onCreate").should("have.been.calledOnce");
    });

    it("aliases should show an error when trying to submit with 0 aliases", () => {
      cy.get("[data-cy='submit']").click();
      cy.get("[data-cy='commaSeparatedInputComp']")
        .find("[data-cy='errorMessage']")
        .invoke("text")
        .should("have.length.above", 5);
    });

    describe("Should not submit with invalid input", () => {
      beforeEach(() => {
        // setup mock api responses for keyword form
        cy.intercept(
          "POST",
          "http://localhost:8080/api/collection*",
          cy
            .spy((req: CyHttpMessages.IncomingHttpRequest) => {
              req.reply({body: {id: 11}});
            })
            .as("post"),
        );
      });

      afterEach(() => {
        // confirm that submit did not run
        cy.get("[data-cy='submit']").click();
        cy.wait(1000);
        // should not call api
        cy.get("@post").should("not.have.been.called");
        // should not update state
        cy.get("@onSubmit").should("not.have.been.called");
        cy.get("@onCreate").should("not.have.been.called");
      });

      it("should not submit when displayName is empty", () => {
        cy.get("@aliases").find("[data-cy='input']").type("alias1, alias2,");
      });

      it("should not submit when displayName is too short", () => {
        cy.get("@displayName").find("[data-cy='input']").type("d");
      });

      it("should not submit when displayName is too long", () => {
        cy.get("@displayName")
          .find("[data-cy='input']")
          .type("display name aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa ");
      });

      it("should not submit when displayName has invalid characters", () => {
        cy.get("@displayName").find("[data-cy='input']").type("d*()_[]");
      });

      it("should not submit when there are no aliases", () => {
        cy.get("@displayName").find("[data-cy='input']").type("display name");
      });
    });

    describe("Display Name input should show error messages on invalid input", () => {
      it("should not show an error message with correct inputs", () => {
        cy.get("@displayName").within(() => {
          cy.get("[data-cy='input']").type("abc");
          cy.get("[data-cy='errorMessage']").invoke("text").should("have.length", 0);
        });
      });

      it("should show an error for empty inputs", () => {
        cy.get("@displayName").within(() => {
          cy.get("[data-cy='errorMessage']").invoke("text").should("have.length.above", 5);
        });
      });

      it("should error on input length below minimum", () => {
        cy.get("@displayName").within(() => {
          cy.get("[data-cy='input']").type("a");
          cy.get("[data-cy='errorMessage']").invoke("text").should("have.length.above", 5);
        });
      });

      it("should error on input length above maximum", () => {
        cy.get("@displayName").within(() => {
          cy.get("[data-cy='input']").type("aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa ");
          cy.get("[data-cy='errorMessage']").invoke("text").should("have.length.above", 5);
        });
      });

      it("should error on invalid symbols", () => {
        cy.get("@displayName").within(() => {
          cy.get("[data-cy='input']").type("aaa *-)([=+] ");
          cy.get("[data-cy='errorMessage']").invoke("text").should("have.length.above", 5);
        });
      });
    });
  });
});

describe("'Edit' mode", () => {
  beforeEach(() => {
    cy.mount(
      <KeywordEditor
        id={1}
        collection="collection"
        mode="Edit"
        initialDisplayName="displayName"
        initialProficient={false}
        initialAliases={["alias1", "alias2"]}
        onSubmit={cy.spy().as("onSubmit")}
        onCreate={cy.spy().as("onCreate")}
        onUpdate={cy.spy().as("onUpdate")}
        onDelete={cy.spy().as("onDelete")}
      />,
    );

    cy.get("[data-cy='inputComp']").eq(0).as("displayName");
    cy.get("[data-cy='inputComp']").eq(1).as("aliases");
  });

  describe("should call onSubmit if the api call succeeds", () => {
    it("on update", () => {
      cy.intercept("PUT", "http://localhost:8080/api/*/*", "success");

      cy.get("[data-cy='submit']").click();
      cy.wait(1000);

      cy.get("@onSubmit").should("be.called");
    });

    it("on delete", () => {
      cy.intercept("DELETE", "http://localhost:8080/api/*/*", "success");

      cy.get("[data-cy='delete']").click();
      cy.wait(1000);

      cy.get("@onSubmit").should("be.called");
    });
  });

  describe("should not call onSubmit if the api call fails", () => {
    it("on failed update", () => {
      cy.get("[data-cy='submit']").click();
      cy.wait(1000);

      cy.get("@onSubmit").should("not.be.called");
    });

    it("on failed delete", () => {
      cy.get("[data-cy='delete']").click();
      cy.wait(1000);

      cy.get("@onSubmit").should("not.be.called");
    });
  });
});
