import CompanionForm from "@/app/(root)/(routes)/companion/[companionId]/components/companion-form";
import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Companion, category } from "@prisma/client";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion: Companion | null = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  console.log(companion);

  const categories: category[] = await prismadb.category.findMany();

  return <CompanionForm categories={categories} initialData={companion} />;
};

export default CompanionIdPage;
