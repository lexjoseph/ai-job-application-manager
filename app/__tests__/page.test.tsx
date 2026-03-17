import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

describe("Home", () => {
  it("renders the title", () => {
    render(<Home />);

    expect(
      screen.getByText("My Personal AI Job Application Tracker"),
    ).toBeInTheDocument();
  });

  it("renders the JobForm component", () => {
    render(<Home />);

    expect(screen.getByPlaceholderText("company")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("role")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Applied")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("date")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add application/i }),
    ).toBeInTheDocument();
  });

  it("displays total applications count", () => {
    render(<Home />);

    expect(screen.getByText("Total Applications: 0")).toBeInTheDocument();
  });

  it("adds a new application and updates the list", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const companyInput = screen.getByPlaceholderText("company");
    const roleInput = screen.getByPlaceholderText("role");
    const dateInput = screen.getByPlaceholderText("date");
    const submitButton = screen.getByRole("button", {
      name: /add application/i,
    });

    await user.type(companyInput, "Test Company");
    await user.type(roleInput, "Test Role");
    await user.type(dateInput, "2023-10-01");
    await user.click(submitButton);

    expect(screen.getByText("Total Applications: 1")).toBeInTheDocument();
    expect(
      screen.getByText("Test Company - Test Role - Applied - 2023-10-01"),
    ).toBeInTheDocument();
  });

  it("adds multiple applications and displays them in reverse order", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const companyInput = screen.getByPlaceholderText("company");
    const roleInput = screen.getByPlaceholderText("role");
    const dateInput = screen.getByPlaceholderText("date");
    const submitButton = screen.getByRole("button", {
      name: /add application/i,
    });

    // Add first application
    await user.clear(companyInput);
    await user.clear(roleInput);
    await user.clear(dateInput);
    await user.type(companyInput, "Company 1");
    await user.type(roleInput, "Role 1");
    await user.type(dateInput, "2023-10-01");
    await user.click(submitButton);

    // Add second application
    await user.clear(companyInput);
    await user.clear(roleInput);
    await user.clear(dateInput);
    await user.type(companyInput, "Company 2");
    await user.type(roleInput, "Role 2");
    await user.type(dateInput, "2023-10-02");
    await user.click(submitButton);

    expect(screen.getByText("Total Applications: 2")).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent(
      "Company 2 - Role 2 - Applied - 2023-10-02",
    );
    expect(listItems[1]).toHaveTextContent(
      "Company 1 - Role 1 - Applied - 2023-10-01",
    );
  });
});
