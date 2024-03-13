import Illustrator from '../components/Illustrator';
export default async function Body() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <div className='max-w-xl p-4 rounded-lg w-full'>
        <h1 className='text-3xl font-bold mb-4'>Illustration AI</h1>
        <p className='text-gray-600 mb-6'>
          Welcome to our AI application. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <div className='flex justify-center w-full'>
          <Illustrator />
        </div>
      </div>
    </div>
  );
}
