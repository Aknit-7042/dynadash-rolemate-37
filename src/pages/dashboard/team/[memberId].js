
import MainLayout from '@/components/layout/MainLayout';
import { useRouter } from 'next/router';
import TeamMemberPage from '@/components/pages/TeamMemberPage';

const TeamMember = () => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <MainLayout>
      <TeamMemberPage memberId={memberId} />
    </MainLayout>
  );
};

export default TeamMember;
