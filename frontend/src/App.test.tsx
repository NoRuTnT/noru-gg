import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "@/app/App";
import { useAppStore } from "@/entities/app/model/app-store";
import { useCharacterStore } from "@/entities/character/model/character-store";
import { useDungeonStore } from "@/entities/dungeon/model/dungeon-store";
import { usePartyStore } from "@/entities/party/model/party-store";

vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

vi.mock("@/pages/main/ui/main-page", () => ({
  MainPage: () => <div>Main Page</div>,
}));

vi.mock("@/pages/about/ui/about-page", () => ({
  AboutPage: () => <div>About Page</div>,
}));

vi.mock("@/pages/party-management/ui/party-management-page", () => ({
  PartyManagementPage: () => <div>Party Management Page</div>,
}));

vi.mock("@/pages/log-analysis/ui/log-analysis-page", () => ({
  LogAnalysisPage: () => <div>Log Analysis Page</div>,
}));

vi.mock("@/pages/knowledge-base/ui/knowledge-base-page", () => ({
  KnowledgeBasePage: () => <div>Knowledge Base Page</div>,
}));

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  useAppStore.setState({
    activePrimaryTab: "main",
    activePartyManagementTab: "overview",
    activeKnowledgeBaseSection: null,
  });

  useCharacterStore.setState({
    characters: [],
    isLoading: false,
    error: null,
    fetchCharacterStore: vi.fn(async () => {}),
  });

  usePartyStore.setState({
    parties: [],
    isLoading: false,
    error: null,
    fetchPartyStore: vi.fn(async () => {}),
  });

  useDungeonStore.setState({
    dungeons: [],
    isLoading: false,
    error: null,
    fetchDungeonStore: vi.fn(async () => {}),
  });
});

describe("App", () => {
  it("renders the primary navigation", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByRole("link", { name: "메인페이지" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "소개" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Knowledge Base" })).toHaveAttribute("href", "/knowledge-base");
    expect(screen.getByRole("link", { name: "파티관리" })).toHaveAttribute("href", "/party-management");
    expect(screen.getByRole("link", { name: "로그분석" })).toHaveAttribute("href", "/log-analysis");
  });

  it("opens a page from its direct URL and updates the URL through navigation", async () => {
    window.history.replaceState(null, "", "/about");

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText("About Page")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "Knowledge Base" }));

    expect(window.location.pathname).toBe("/knowledge-base");
    expect(screen.getByText("Knowledge Base Page")).toBeInTheDocument();
  });
});
