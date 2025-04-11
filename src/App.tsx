import { ChakraProvider, Box, Container, Grid, GridItem, Text, VStack, Heading, Alert, AlertIcon, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import ProjectForm from './components/ProjectForm'
import CodeDisplay from './components/CodeDisplay'
import { ProjectResponse } from './types'

function App() {
  const [projectResponse, setProjectResponse] = useState<ProjectResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)

  const handleGenerate = async (response: ProjectResponse) => {
    try {
      setError(null)
      setPreviewLoading(true)
      setProjectResponse(response)
    } catch (err) {
      setError('Failed to generate project. Please try again.')
      console.error('Project generation error:', err)
    } finally {
      setPreviewLoading(false)
    }
  }

  const getPreviewContent = (response: ProjectResponse): string => {
    const htmlFile = response.files.find(file => file.name === 'index.html')
    if (!htmlFile) return ''

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${htmlFile.content}
        </body>
      </html>
    `
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={8}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} minH="calc(100vh - 64px)">
            {/* Prompt UI Section */}
            <GridItem>
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md" height="100%">
                <Heading size="md" mb={4}>Project Generator</Heading>
                <ProjectForm 
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
                {error && (
                  <Alert status="error" borderRadius="lg" mt={4}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
              </Box>
            </GridItem>

            {/* Website Preview Section */}
            <GridItem>
              <Box 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                boxShadow="md" 
                height="100%"
                display="flex"
                flexDirection="column"
              >
                <Heading size="md" mb={4}>Website Preview</Heading>
                <Box 
                  flex="1"
                  border="1px solid" 
                  borderColor="gray.200" 
                  borderRadius="md" 
                  overflow="hidden"
                  position="relative"
                >
                  {previewLoading ? (
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center" 
                      height="100%"
                    >
                      <Spinner size="xl" color="blue.500" />
                    </Box>
                  ) : projectResponse ? (
                    projectResponse.files && projectResponse.files.find(file => file.name === 'index.html') ? (
                      <iframe 
                        srcDoc={getPreviewContent(projectResponse)}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          border: 'none',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        title="Website Preview"
                        onError={(e) => {
                          console.error('Preview iframe error:', e)
                          setError('Failed to load preview. Please try again.')
                        }}
                      />
                    ) : (
                      <Text color="gray.500" textAlign="center" py={10}>
                        No HTML file found in the generated project
                      </Text>
                    )
                  ) : (
                    <Text color="gray.500" textAlign="center" py={10}>
                      Generate a project to see the preview here
                    </Text>
                  )}
                </Box>
              </Box>
            </GridItem>

            {/* Generated Code Section */}
            <GridItem>
              <Box 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                boxShadow="md"
                height="100%"
                display="flex"
                flexDirection="column"
              >
                <Heading size="md" mb={4}>Generated Code</Heading>
                <Box 
                  flex="1"
                  overflowY="auto"
                >
                  {projectResponse ? (
                    <CodeDisplay projectResponse={projectResponse} />
                  ) : (
                    <Text color="gray.500" textAlign="center" py={10}>
                      Generated code will appear here
                    </Text>
                  )}
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App 