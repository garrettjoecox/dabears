import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import tracksSource from '../../public/tracks.json';

export async function getStaticProps() {
  return {
    props: {
      tracks: tracksSource,
    },
  };
}

type HomeProps = {
  tracks: typeof tracksSource;
};

export default function Home({ tracks }: HomeProps) {
  return (
    <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="8" p="8">
      {tracks.map((track) => (
        <Box key={track.id}>
          <Link href={`/${track.id}`}>
            <a>
              <Image src={`/img/${track.id}.jpg`} height="187" width="240" />
              <Heading fontSize="xl">{track.title}</Heading>
              <Text>{track.tags}</Text>
            </a>
          </Link>
        </Box>
      ))}
    </SimpleGrid>
  );
}
