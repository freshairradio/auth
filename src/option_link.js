import React from 'react'
import { Card } from './card'
import {
  ThemeProvider,
  CSSReset,
  Heading,
  Button,
  Divider,
  Box,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
  AvatarBadge,
  Editable,
  AspectRatioBox,
  EditableInput,
  EditablePreview,
  Text,
  FormControl,
  Image,
  FormLabel,
  FormErrorMessage,
  Collapse,
  Input,
  ButtonGroup,
  FormHelperText,
  Tab,
  Tag,
  TagIcon,
  TagLabel,
  TagCloseButton,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption
} from '@chakra-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from 'react-router-dom'
import { freshairTheme } from './theme'

export const OptionLink = ({ to, text, children }) => (
  <Card>
    <Stack isInline align="center">
      <Text>{children}</Text>
      <Box ml="auto">
        <Link to={to}>
          <Button
            variantColor="orange"
            variant="solid"
            textTransform="lowercase"
            fontWeight="100"
            background="white"
            color={freshairTheme.colors.orange[500]}
          >
            {text}
          </Button>
        </Link>
      </Box>
    </Stack>
  </Card>
)
