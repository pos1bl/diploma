import { ContainedButton } from "@components/shared/ContainedButton";
import { Loader } from "@components/shared/Loader";
import { useAuthStore } from "@hooks/useStore";
import { Role } from "@models/IUser";
import { Box, } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { sessionQueryOptions } from "@utils/QueryOptioms";
import { useEffect, useRef } from "react";

export const VideoPage = () => {
  const { user } = useAuthStore();

  const appointmentId = useParams({
    from: user.role === Role.SPECIALIST ? "/_authenticated/specialist/video-call/$appointmentId" : "/_authenticated/user/video-call/$appointmentId",
    select: (params) => params.appointmentId 
  })
  const { data: session , isLoading } = useQuery(sessionQueryOptions(user.role, appointmentId));
  const refContainer = useRef<HTMLDivElement>(null);
  const hangupUrl = user.role === Role.SPECIALIST ? "/specialist/appointment/$appointmentId" : "/user/appointments/$appointmentId"

  useEffect(() => {
    if (!session || !refContainer.current) return;

    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      const api = new (window as any).JitsiMeetExternalAPI('meet.jit.si', {
        roomName: session._id,
        parentNode: refContainer.current!,
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone','camera','desktop'],
          DEFAULT_REMOTE_DISPLAY_NAME: 'Учасник',
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        configOverwrite: {
          enableWelcomePage: false,
          disableDeepLink: true,
          disableSimulcast: false,
          disableRtx: true,
          prejoinConfig: {
            enabled: false,
            hideDisplayName: true,
            hideExtraJoinButtons: ['no-audio','by-phone']
          },
          disableInviteFunctions: true,
        },
        userInfo: {
          displayName: user.name || 'Користувач',
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      if (refContainer.current) refContainer.current.innerHTML = '';
    };
  }, [session]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Link to={hangupUrl} params={{ appointmentId }}>
        <ContainedButton sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}>
          Вийти з конференції
        </ContainedButton>
      </Link>
      <Box
        sx={{ width: '100%', height: 'calc(100vh - 70px)' }}
        ref={refContainer}
      />
    </>
  );
}