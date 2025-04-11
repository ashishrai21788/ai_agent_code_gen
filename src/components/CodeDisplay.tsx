import React from 'react'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  useToast,
  IconButton,
  Tooltip,
  Container,
} from '@chakra-ui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ProjectResponse } from '../types'
import { DownloadIcon } from '@chakra-ui/icons'

interface CodeDisplayProps {
  projectResponse: ProjectResponse
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ projectResponse }) => {
  const toast = useToast()

  const downloadFile = (fileName: string, content: string) => {
    try {
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName.split('/').pop() || fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast({
        title: 'File downloaded',
        description: `Successfully downloaded ${fileName}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error downloading file:', error)
      toast({
        title: 'Download failed',
        description: `Failed to download ${fileName}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const downloadAllFiles = () => {
    try {
      import('jszip').then((JSZip) => {
        const zip = new JSZip.default()
        
        projectResponse.files.forEach((file) => {
          const filePath = file.path.startsWith('/') ? file.path.slice(1) : file.path
          zip.file(filePath, file.content)
        })

        zip.generateAsync({ type: 'blob' }).then((content) => {
          const url = URL.createObjectURL(content)
          const a = document.createElement('a')
          a.href = url
          a.download = 'project.zip'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)

          toast({
            title: 'Project downloaded',
            description: 'Successfully downloaded all project files as ZIP',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }).catch(error => {
          console.error('Error generating ZIP:', error)
          toast({
            title: 'ZIP generation failed',
            description: 'Failed to create ZIP file',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        })
      })
    } catch (error) {
      console.error('Error downloading all files:', error)
      toast({
        title: 'Download failed',
        description: 'Failed to download project files',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box width="100%" bg="white" py={10}>
      <Container maxW="100%" px={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Project Structure
            </Text>
            <Text color="gray.600" fontSize="lg" mb={6}>
              {projectResponse.instructions}
            </Text>
            <Button
              leftIcon={<DownloadIcon />}
              colorScheme="blue"
              onClick={downloadAllFiles}
              size="lg"
              height="60px"
              px={8}
              fontSize="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
              transition="all 0.2s"
            >
              Download All Files
            </Button>
          </Box>

          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Dependencies
            </Text>
            <HStack spacing={3} flexWrap="wrap">
              {projectResponse.dependencies.map((dep) => (
                <Badge 
                  key={dep} 
                  colorScheme="blue" 
                  fontSize="md" 
                  py={2} 
                  px={4} 
                  borderRadius="full"
                >
                  {dep}
                </Badge>
              ))}
            </HStack>
          </Box>

          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Project Files
            </Text>
            <Accordion allowMultiple>
              {projectResponse.files.map((file) => (
                <AccordionItem key={file.path}>
                  <h2>
                    <AccordionButton py={4}>
                      <Box flex="1" textAlign="left" fontSize="lg">
                        {file.path || file.name}
                      </Box>
                      <Tooltip label="Download file">
                        <IconButton
                          aria-label="Download file"
                          icon={<DownloadIcon />}
                          size="md"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            downloadFile(file.path || file.name, file.content)
                          }}
                          mr={4}
                          _hover={{
                            bg: "blue.50"
                          }}
                        />
                      </Tooltip>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6}>
                    <Box borderRadius="md" overflow="hidden">
                      <SyntaxHighlighter
                        language={file.name.split('.').pop()}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: '8px',
                          padding: '20px',
                        }}
                      >
                        {file.content}
                      </SyntaxHighlighter>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default CodeDisplay 