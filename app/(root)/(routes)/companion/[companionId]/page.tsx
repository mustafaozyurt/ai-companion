import CompanionForm from "@/components/companion-form";
import prismadb from "@/lib/prismadb";
import { Companion, category } from "@prisma/client";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const companion: Companion | null = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories: category[] = await prismadb.category.findMany();

  return <CompanionForm categories={categories} initialData={companion} />;
};

export default CompanionIdPage;
