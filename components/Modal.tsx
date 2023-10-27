import RNModal from 'react-native-modal'
import { MediumText, View } from './Themed'

interface ModalProps {
  isVisible?: boolean
  children: React.ReactNode
}

export function Modal({ isVisible = false, children, ...props }: ModalProps) {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      coverScreen
      {...props}
    >
      {children}
    </RNModal>
  )
}

function ModalContainer({ children }: { children: React.ReactNode }) {
  return <View className="bg-white rounded-lg p-4 shadow-md">{children}</View>
}

function ModalHeader({ title }: { title: string }) {
  return (
    <View className="mb-2 bg-transparent">
      <MediumText className="text-xl text-primary">{title}</MediumText>
    </View>
  )
}

function ModalBody({ children }: { children: React.ReactNode }) {
  return <View className="bg-transparent">{children}</View>
}

Modal.Container = ModalContainer
Modal.Header = ModalHeader
Modal.Body = ModalBody
