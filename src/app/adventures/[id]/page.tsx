import Comments from '@/components/comments';
import FormComment from '@/components/form-comments';
import prisma from '@/lib/db';
import { FC } from 'react';

interface AdventureDetailPageProps {
  params: {
    id: string;
  };
}
const AdventureDetailPage: FC<AdventureDetailPageProps> = async ({ params }) => {
  const adventure = await prisma.adventure.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold'>{adventure?.title}</h1>
      <p>Written by: {adventure?.author?.name}</p>
      <div className='mt-4'>{adventure?.content}</div>

      <Comments adventureId={params.id} />
      <FormComment adventureId={params.id} />
    </div>
  );
};

export default AdventureDetailPage;
