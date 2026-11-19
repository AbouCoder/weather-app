import { PageContainer } from "./components/PageContainer";
import { SavedCitiesList } from "./components/SavedCitiesList";

export default function Home() {
  return (
    <PageContainer className="py-24">
      <SavedCitiesList />
    </PageContainer>
  );
}
