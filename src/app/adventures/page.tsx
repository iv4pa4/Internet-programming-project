import prisma from '@/lib/db';
import Link from 'next/link';

const AdventuresPage = async () => {
  const adventures = await prisma.adventure.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
  });

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Adventures</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {adventures.map((adventure) => (
          <Link
            key={adventure.id}
            href={`/adventures/${adventure.id}`}
            className='bg-white p-4 rounded-md shadow-md'
            style={{ color: 'black' }}
          >
            <h2 className='text-xl font-bold'>{adventure.title}</h2>
            <p>Written by: {adventure.author?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdventuresPage;
