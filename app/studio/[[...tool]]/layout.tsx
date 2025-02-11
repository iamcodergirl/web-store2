import React from 'react'

export default function Layout( {children }: {children: React.ReactNode}) {
  return (   
    <html lang="en" suppressHydrationWarning>
    <head> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      {children}
    </body>
    </html>
  )
}
