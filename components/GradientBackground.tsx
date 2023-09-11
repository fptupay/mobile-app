import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

export default function GradientBackground() {
	return (
		<LinearGradient
			colors={['#fdc83080', '#f97316bf']}
			className="absolute top-0 left-0 right-0 h-full bg-white"
		/>
	)
}
