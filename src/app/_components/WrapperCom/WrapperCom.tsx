"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function WrapperCom({children}:{children:React.ReactNode}) {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
